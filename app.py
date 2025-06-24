"""地址轉換為座標"""
import time
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import requests
from datetime import date

# 定義：從 TGOS 網站取得座標
def get_coordinates_from_tgos(addr: str):
    """地址轉換為座標函式"""
    url = f"https://map.tgos.tw/TGOSCloudMap?addr={addr}"
    options = Options()
    options.add_argument("headless")
    browser = webdriver.Chrome(options=options)
    browser.get(url)

    try:
        wait = WebDriverWait(browser, 10)
        location_div = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "div.fw-normal.text-secondary")))
        span_text = location_div.find_element(By.TAG_NAME, "span").text
        full_text = location_div.text
        coords_text = full_text.replace(span_text, "").strip()
        lat, lng = coords_text.split(",")
        return lat.strip(), lng.strip()
    except Exception as e:
        print(f"地址「{addr}」取得座標失敗：{e}")
        return None, None
    finally:
        browser.quit()

today = date.today().strftime("%Y%m%d")

FILE_NAME = r'data/全國5大超商資料集.csv'
NEW_FILE_NAME = f'data/全國5大超商資料集_{today}.csv'

url = r"https://data.gcis.nat.gov.tw/od/file?oid=C054F05C-0A6B-428C-B388-288BDB0618E4"
response = requests.get(url, timeout=10)
with open(NEW_FILE_NAME, "wb") as f:
    f.write(response.content)

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
