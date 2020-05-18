<template>
  <div class="dialog-wrapper">
    <div class="dialog-dark" @click="$emit('close')"></div>
    <div class="dialog-window">
      <div class="dialog-topbar">
        <b-button variant="danger" @click="$emit('close')"> X </b-button>
      </div>
      <div class="dialog-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  data: function () {
    return {
    }
  }
}
</script>

<style scoped lang="less">
@import '../style/colors.less';

.dialog-wrapper {
  overflow: auto;
  display: block;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 45px;
  z-index: 10;
}
.dialog-dark {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #000;
  opacity: 0.6;
}
.dialog-window {
  position: relative;
  overflow: auto;
  background: @secondary-bg-color;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  box-shadow: black 0px 0px 30px 5px;
}
.dialog-topbar {
  background: @bar-bg-color;
  text-align: right;
}
.dialog-topbar button {
  font-size: 1.2em;
}
.dialog-content {
  position: relative;
}
</style>
