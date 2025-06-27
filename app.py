"""地址轉換為座標"""
import os
import time
from datetime import date
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException, WebDriverException
import requests

# https://map.tgos.tw/TGOSCloudMap?addr=新竹縣關西鎮東安里中山東路26號
# https://map.tgos.tw/TGOSCloudMap?addr=新北市板橋區中山路一段１２６、１２８號１樓

# 定義：從 TGOS 網站取得座標
# def get_coordinates_from_tgos(addr: str):
#     """地址轉換為座標函式"""
#     url = f"https://map.tgos.tw/TGOSCloudMap?addr={addr}"
#     options = Options()
#     options.add_argument("--headless=new")


#     try:
#         browser = webdriver.Chrome(options=options)
#     except WebDriverException as e:
#         print(f"無法啟動瀏覽器：{e}")
#         return None, None

#     try:
#         browser.get(url)
#         wait = WebDriverWait(browser, 10)

        # location_div = wait.until(
        #     EC.presence_of_element_located((By.CSS_SELECTOR, "body > div:nth-child(45) > div > div > div.modal-body > div"))
        #     )

        # # 判斷是否包含指定字串
        # if "搜尋不到任何地址" in location_div.text:
        #     print(f"地址「{addr}」查無座標資料。")
        #     return 0, 0

#         location_div = wait.until(
#             EC.presence_of_element_located((By.CSS_SELECTOR, "div.fw-normal.text-secondary"))
#             )
#         try:
#             span_text = location_div.find_element(By.TAG_NAME, "span").text
#             full_text = location_div.text
#             coords_text = full_text.replace(span_text, "").strip()
#             lat, lng = coords_text.split(",")
#             return lat.strip(), lng.strip()
#         except (ValueError, NoSuchElementException) as e:
#             print(f"解析座標失敗：{e}")
#             return None, None
#     except TimeoutException:
#         print(f"地址「{addr}」載入逾時，無法取得座標。")
#         return 0, 0
#     except Exception as e:
#         print(f"地址「{addr}」取得座標時發生錯誤：{e}")
#         return 0, 0
#     finally:
#         browser.quit()

def get_coordinates_from_tgos(addr: str):
    """地址轉換為座標函式"""
    url = f"https://map.tgos.tw/TGOSCloudMap?addr={addr}"
    options = Options()
    options.add_argument("headless")

    try:
        browser = webdriver.Chrome(options=options)
    except WebDriverException as e:
        print(f"無法啟動瀏覽器：{e}")
        return None, None

    try:
        browser.get(url)
        wait = WebDriverWait(browser, 10)

        location_div = wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "body > div:nth-child(45) > div > div > div.modal-body > div"))
            )

        # 判斷是否包含指定字串
        if "搜尋不到任何地址" in location_div.text:
            print(f"地址「{addr}」查無座標資料。")
            return 0, 0

        # 等待 li 元素出現
        li_tag = wait.until(EC.presence_of_element_located((By.CLASS_NAME, "complex-locate-item")))

        lat = li_tag.get_attribute("data-lat")
        lng = li_tag.get_attribute("data-lng")

        if not lat or not lng:
            print(f"地址「{addr}」查無座標資料。")
            return 0, 0

        return lat.strip(), lng.strip()

    except TimeoutException:
        print(f"地址「{addr}」載入逾時，無法取得座標。")
        return 0, 0
    except Exception as e:
        print(f"地址「{addr}」取得座標時發生錯誤：{e}")
        return 0, 0
    finally:
        browser.quit()

today = date.today().strftime("%Y%m%d")

# 取得索引資料
FILE_NAME = r'data/全國5大超商資料集.csv'
NEW_FILE_NAME = f'data/全國5大超商資料集_{today}.csv'

if not os.path.exists(NEW_FILE_NAME):
    INDEX_URL = r"https://data.gcis.nat.gov.tw/od/file?oid=C054F05C-0A6B-428C-B388-288BDB0618E4"
    response = requests.get(INDEX_URL, timeout=10)
    with open(NEW_FILE_NAME, "wb") as f:
        f.write(response.content)
    print('索引檔下載完成。')

# 讀取 CSV 檔案
df = pd.read_csv(FILE_NAME)
ndf = pd.read_csv(NEW_FILE_NAME)

# 定義比對欄位
key_columns = ["分公司統一編號", "分公司名稱", "分公司地址"]

# 合併比對新舊資料
merged = ndf.merge(df, on=key_columns, how='left', indicator=True)
new_rows = merged[merged['_merge'] == 'left_only']

# 篩選出真正的新資料
new_data_filtered = ndf[ndf[key_columns].isin(new_rows[key_columns].to_dict(orient='list')).all(axis=1)].copy()

# 合併新資料到原始資料
df = pd.concat([df, new_data_filtered], ignore_index=True)

# 若尚未有緯度與經度欄位，則新增
if "緯度" not in df.columns:
    df["緯度"] = ""
if "經度" not in df.columns:
    df["經度"] = ""

# 計算總筆數
total_rows = len(df)
print(f"📊 總筆數：{total_rows}")

# 逐筆處理地址（略過已有座標者）
SAVE_INTERVAL = 10
NEW_PROCESSED_COUNT = 0

for idx, row in df.iterrows():
    if pd.notna(row["緯度"]) and pd.notna(row["經度"]) and row["緯度"] != "" and row["經度"] != "":
        print(f"⏩ 第 {idx + 1}/{total_rows} 筆已有座標，略過。")
        continue

    if row["緯度"] == 0 and row["經度"] == 0:
        print(f"⏩ 第 {idx + 1}/{total_rows} 筆已有座標，略過。")
        continue

    address = row["分公司地址"]
    Lat, Lng = get_coordinates_from_tgos(address)
    df.at[idx, "緯度"] = Lat
    df.at[idx, "經度"] = Lng
    NEW_PROCESSED_COUNT += 1
    print(f'✅ 第 {idx + 1}/{total_rows} 筆地址：{address}；座標經度 {Lng}，緯度 {Lat}。')

    if NEW_PROCESSED_COUNT % SAVE_INTERVAL == 0:
        df.to_csv(FILE_NAME, index=False)
        print(f"💾 已儲存 {NEW_PROCESSED_COUNT} 筆新查詢資料。")

    time.sleep(1)  # 避免過快請求

# 最後儲存一次
df.to_csv(FILE_NAME, index=False)
print("✅ 已完成所有座標查詢並儲存。")
