<template>
  <div class="components">
    <customBtn>
      Add Button
    </customBtn>
    <hr/>
    <feed @openPSWP="openPSWP($event)" />



    <photoswipe-custom-components :isOpen="PSWisOpen"
                                  v-if="photos && photos.length"
                                  :items="photos"
                                  :options="PSWOptions"
                                  @close="hidePhotoSwipe()"/>
  </div>
</template>

<script>
  export default {
    name: "components",

    data() {
      return {
        PSWisOpen: false,
        photos: [],
        PSWOptions: {
          loop: false,
          showHideOpacity: true,
          getThumbBoundsFn: false,
          showAnimationDuration: 150,
          hideAnimationDuration: 150,
          shareEl: false,
          captionEl: false,
          bgOpacity: 0.65,
          index: 1,
        },
      }
    },

    methods: {
      openPSWP(e) {

        // this.photos = images.map(x => ({...x, w: x.dimensions.width, h: x.dimensions.height, src: x.thumbOrigin2x}));
        this.PSWOptions.index = e.index;
        this.photos = e.items;

        setTimeout(() => {
          this.PSWisOpen = true;
        }, 100)

      },

      hidePhotoSwipe() {
        this.PSWisOpen = false;
      }
    }
  }
</script>

<style lang="scss">
  .components {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #F0F0F0;
    padding: 50px;
  }

  hr {
    width: 100%;
    height: 2px;
    background-color: black;
    margin: 50px 0;
  }
</style>
