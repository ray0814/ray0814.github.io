<template>
  <div
    class="vsm--scroll-wrapper"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div ref="scrollRef" class="vsm--scroll" @scroll="onScroll">
      <slot />
    </div>
    <transition>
      <div
        v-show="visible"
        ref="scrollBarRef"
        class="vsm--scroll-bar"
        @mousedown="onClick"
      >
        <div
          ref="scrollThumbRef"
          class="vsm--scroll-thumb"
          :class="[cursorDown && 'vsm--scroll-thumb_clicking']"
          @mousedown="onMouseDown"
        />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  compatConfig: { MODE: 3 },
}
</script>

<script setup>
import { ref, onMounted, watch, nextTick, provide, onUnmounted } from 'vue'
import { useSidebar } from '../use/useSidebar'

const { getIsCollapsed: isCollapsed } = useSidebar()

const scrollRef = ref(null)
const scrollBarRef = ref(null)
const scrollThumbRef = ref(null)

const cursorDown = ref(false)
let cursorY = 0
let cursorIn = false

const visible = ref(false)

const onScrollUpdate = () => {
  if (!scrollRef.value) return
  nextTick(() => {
    updateThumb()
  })
}

const onScroll = () => {
  requestAnimationFrame(onScrollUpdate)
}

const onClick = (e) => {
  const offset = Math.abs(
    scrollBarRef.value.getBoundingClientRect().y - e.clientY
  )
  const thumbHalf = scrollThumbRef.value.offsetHeight / 2
  updateScrollTop(offset - thumbHalf)
}

const onMouseDown = (e) => {
  e.stopImmediatePropagation()
  cursorDown.value = true
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
  cursorY =
    scrollThumbRef.value.offsetHeight -
    (e.clientY - scrollThumbRef.value.getBoundingClientRect().y)
}

const onMouseMove = (e) => {
  if (!cursorDown.value) return
  const offset = e.clientY - scrollBarRef.value.getBoundingClientRect().y
  const thumbClickPosition = scrollThumbRef.value.offsetHeight - cursorY
  visible.value = true
  updateScrollTop(offset - thumbClickPosition)
}

const onMouseUp = (e) => {
  cursorDown.value = false
  cursorY = 0
  if (!cursorIn) {
    visible.value = false
  }
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
}

const onMouseEnter = (e) => {
  visible.value = true
  cursorIn = true
}

const onMouseLeave = (e) => {
  cursorIn = false
  if (!cursorDown.value) {
    visible.value = false
  }
}

const updateThumb = () => {
  const heightPerc =
    (scrollRef.value.clientHeight * 100) / scrollRef.value.scrollHeight
  const thumbHeightPerc = heightPerc < 100 ? heightPerc : 0
  const thumbYPerc =
    (scrollRef.value.scrollTop * 100) / scrollRef.value.clientHeight || 0

  scrollThumbRef.value.style.height = `${thumbHeightPerc}%`
  scrollThumbRef.value.style.transform = `translateY(${thumbYPerc}%)`
}

const updateScrollTop = (y) => {
  const scrollPerc = (y * 100) / scrollBarRef.value.offsetHeight
  scrollRef.value.scrollTop = (scrollPerc * scrollRef.value.scrollHeight) / 100
}

watch(
  () => isCollapsed.value,
  () => {
    onScrollUpdate()
  }
)

onMounted(() => {
  onScrollUpdate()
  window.addEventListener('resize', onScrollUpdate)
})
onUnmounted(() => {
  window.removeEventListener('resize', onScrollUpdate)
})

provide('emitScrollUpdate', onScrollUpdate)
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: 0.3s opacity ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
