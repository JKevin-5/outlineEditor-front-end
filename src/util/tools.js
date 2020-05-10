import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

//提示toast
export function makeToast(variant = null) {
  $('div').$bvToast.toast('Toast body content', {
    title: `Variant ${variant || 'default'}`,
    variant: variant,
    solid: true
  })
}
