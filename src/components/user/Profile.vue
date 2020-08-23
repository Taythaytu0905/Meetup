<template>
    <div>
        <p>{{profileUser.id}}</p>
    </div>
</template>

<script>
export default {
  computed: {
    profileUser () {
      return this.$store.getters.user
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
