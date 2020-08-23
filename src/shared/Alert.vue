<template>
    <v-alert type="error" @input="onClose" dismissible>
      {{text}}
    </v-alert>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    onClose () {
      this.$emit('dismissed')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
