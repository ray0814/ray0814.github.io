# vue-sidebar-menu (for Vue 3)

A Vue.js sidebar menu component with vue-router compatibility

## Demo

[vue-sidebar-menu-demo](https://yaminncco.github.io/vue-sidebar-menu/)

### :warning: This documentation is for Vue 3, for Vue 2 [click here](https://github.com/yaminncco/vue-sidebar-menu/tree/vue2)

## Installation

```
npm i vue-sidebar-menu --save
```

Install the plugin globally.

```js
//main.js
import { createApp } from 'vue'
import App from './App.vue'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

const app = createApp(App)
app.use(VueSidebarMenu)
app.mount('#app')
```

Or import the component locally.

```js
//App.vue
import { SidebarMenu } from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
export default {
  components: {
    SidebarMenu,
  },
}
```

## Basic Usage

```html
<template>
  <sidebar-menu :menu="menu" />
</template>

<script>
  export default {
    data() {
      return {
        menu: [
          {
            header: 'Main Navigation',
            hiddenOnCollapse: true,
          },
          {
            href: '/',
            title: 'Dashboard',
            icon: 'fa fa-user',
          },
          {
            href: '/charts',
            title: 'Charts',
            icon: 'fa fa-chart-area',
            child: [
              {
                href: '/charts/sublink',
                title: 'Sub Link',
              },
            ],
          },
        ],
      }
    },
  }
</script>
```

### Item Properties

```js
menu: [
  // item
  {
    // string or a location object
    href: '/',
    // href: { path: '/' }

    title: 'Dashboard',

    // icon class
    icon: 'fa fa-user',
    /* or custom icon
    icon: {
        element: 'span',
        class: 'fa fa-user',
        // attributes: {}
        // text: ''
    }
    */

    /*
    badge: {
        text: 'new',
        class: 'vsm--badge_default'
        // attributes: {}
        // element: 'span'
    }
    */

    // child: []
    // disabled: true
    // class: ''
    // attributes: {}
    // hidden: false
    // hiddenOnCollapse: true

    /* with vue-router */
    // external: true
    // exact: true // apply active class when current route is exactly the same. (based on route records, query & hash are not relevant)

    // isActive: (item) => boolean | void // return a boolean to override the default active matcher
  },
  // header item
  {
    header: 'Main Navigation',
    // hidden: false
    // hiddenOnCollapse: true
    // class: ''
    // attributes: {}
  },
  // component item
  {
    component: componentName,
    // props: componentProps
    // hidden: false
    // hiddenOnCollapse: true
  }
]
```

## Props

```js
props: {
  // Sidebar menu (required)
  menu: {
    type: Array,
    required: true
  },

  // Sidebar Collapse state (v-model:collapsed to enable two-way data binding)
  collapsed: {
    type: Boolean,
    default: false
  },

  // Sidebar width (expanded)
  width: {
    type: String,
    default: '290px'
  },

  // Sidebar width (collapsed)
  widthCollapsed: {
    type: String,
    default: '65px'
  },

  // Keep only one child opened at a time (true: first level only, 'deep': all levels)
  showOneChild: {
    type: [Boolean, String],
    default: false
  },

  // Keep all child open
  showChild: {
    type: Boolean,
    default: false
  },

  // Sidebar right to left
  rtl: {
    type: Boolean,
    default: false
  },

  // Make sidebar relative to the parent (by default the sidebar is relative to the viewport)
  relative: {
    type: Boolean,
    default: false
  },

  // Hide toggle collapse btn
  hideToggle: {
    type: Boolean,
    default: false
  },

  // Sidebar theme (available themes: 'white-theme')
  theme: {
    type: String,
    default: ''
  },

  // Disable hover on collapse mode
  disableHover: {
    type: Boolean,
    default: false
  },

  // The name of the custom link component (must be registered globally and define item as a prop)
  linkComponentName: {
    type: String,
    default: undefined
  },

  // Smooth scroll on item expand
  smoothScroll: {
    type: Boolean,
    default: false,
  },
}
```

## Events

```html
<sidebar-menu @update:collapsed="onToggleCollapse" @item-click="onItemClick" />
... methods: { onToggleCollapse(collapsed) {}, onItemClick(event, item) {} } ...
```

**@update:collapsed(collapsed)** Trigger on toggle btn click

**@item-click(event, item)** Trigger on item link click

## Styles

All styles customization can be done in normal CSS by using this classes

```css
.v-sidebar-menu {}
.v-sidebar-menu.vsm_expanded {}
.v-sidebar-menu.vsm_collapsed {}
.v-sidebar-menu.vsm_rtl {}
.v-sidebar-menu .vsm--item {}
.v-sidebar-menu .vsm--link {}
.v-sidebar-menu .vsm--link_active {}
.v-sidebar-menu .vsm--link_hover {}
.v-sidebar-menu .vsm--link_open {}
.v-sidebar-menu .vsm--link_mobile {}
.v-sidebar-menu .vsm--link_level-[n] {}
.v-sidebar-menu .vsm--link_disabled {}
.v-sidebar-menu .vsm--title {}
.v-sidebar-menu .vsm--icon {}
.v-sidebar-menu .vsm--arrow {}
.v-sidebar-menu .vsm--arrow_open {}
.v-sidebar-menu .vsm--badge {}
.v-sidebar-menu .vsm--badge_default {}
.v-sidebar-menu .vsm--header {}
.v-sidebar-menu .vsm--dropdown {}
.v-sidebar-menu .vsm--mobile-bg {}
.v-sidebar-menu .vsm--toggle-btn {}
```

## Theming

You can create your own theme with SCSS or, you can edit the locally scoped CSS variables.

**Sass variables:** (complete list of all variables can be found in `src/scss/_variables.scss`)

You can now use the module system (@use and @forward rules) instead of @import.

```scss
@use 'vue-sidebar-menu/src/scss/vue-sidebar-menu.scss' with (
  $primary-color: red
);
```
⚠️ Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0

```scss
// Your variable overrides here.
$primary-color: red;
@import 'vue-sidebar-menu/src/scss/vue-sidebar-menu.scss';
```

**CSS variables:**

```css
.v-sidebar-menu {
  --vsm-primary-color: #4285f4;
  --vsm-base-bg: #2a2a2e;
  --vsm-item-color: #fff;
  --vsm-item-active-color:;
  --vsm-item-active-bg:;
  --vsm-item-active-line-color: var(--vsm-primary-color);
  --vsm-item-open-color: #fff;
  --vsm-item-hover-color:;
  --vsm-item-open-bg: var(--vsm-primary-color);
  --vsm-item-hover-bg: rgba(30, 30, 33, 0.5);
  --vsm-icon-color: var(--vsm-item-color);
  --vsm-icon-bg: #1e1e21;
  --vsm-icon-active-color:;
  --vsm-icon-active-bg:;
  --vsm-icon-open-color:;
  --vsm-icon-open-bg:;
  --vsm-mobile-item-color: #fff;
  --vsm-mobile-item-bg: var(--vsm-primary-color);
  --vsm-mobile-icon-color: var(--vsm-mobile-item-color);
  --vsm-mobile-icon-bg: transparent;
  --vsm-dropdown-bg: #36363b;
  --vsm-header-item-color: rgba(255, 255, 255, 0.7);
  --vsm-toggle-btn-color: #fff;
  --vsm-toggle-btn-bg: #1e1e21;
  --vsm-item-font-size: 16px;
  --vsm-item-line-height: 35px;
  --vsm-item-padding: 10px 15px;
  --vsm-icon-height: 35px;
  --vsm-icon-width: 35px;
}
```

## Slots

```html
<sidebar-menu>
  <template v-slot:header>header</template>
  <template v-slot:footer>footer</template>
  <template v-slot:toggle-icon>toggle-icon</template>
  <template v-slot:dropdown-icon="{ isOpen }">
    <span v-if="!isOpen">+</span>
    <span v-else>-</span>
  </template>
</sidebar-menu>
```

## Customize link

by default the component use a customized version of `<router-link>`, if your are using a 3rd party framework you can customize the link via the use of the `link-component-name` prop.

the link component must be registered globally and define item as a prop.

example with inertia.js:

```js
import { createApp, h } from 'vue'
import link from '@inertiajs/inertia-vue3/src/link'

const customLink = {
  name: 'CustomLink',
  props: ['item'],
  render() {
    return h(link, this.$slots.default)
  },
  watch: {
    '$page.url'() {
      this.onRouteChange()
    },
  },
  inject: ['onRouteChange'],
}

const app = createApp(App)
app.component('custom-link', customLink)
```

```html
<sidebar-menu :link-component-name="'custom-link'"></sidebar-menu>
```

Note: the `onRouteChange` function can be injected useful for updating the active state whenever the url change.
