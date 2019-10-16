<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    meta: {
      type: Object,
      default: () => {
        return {
          title: '',
          icon: ''
        }
      }
    }
  },
  render(h, context) {
    const { icon, title } = context.props.meta
    const vnodes = []

    if (icon) {
      vnodes.push(<div class='icon-class'><svg-icon icon-class={icon} class-name="menu-icon"/></div>)
    }

    if (title) {
      vnodes.push(<span slot='title' class='menu-title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>
<style lang="scss" scoped>

</style>
