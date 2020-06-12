<template>
    <div>
      <importFile @import="importFile"
                  :is-sending="isSending"/>
    </div>
</template>

<script>
    export default {
        name: "add",
      data() {
        return {
          isSending: false,
          urlFiles: [],
        }
      },

      methods: {
        async importFile(files) {
          let promiseList = [];
          files.forEach(file => {
            let formData = new FormData;
            formData.append('file', file);

            const sendMethod = async () => {
              await this.$axios.post('common/upload', formData)
                .then(response => {

                })
                .catch(error => console.log(error));
            };

            promiseList.push(sendMethod());
          })
          // this.isSending = true;
          await Promise.all(promiseList)
            .then((response) => console.log(response))
            .catch(error => console.log(error));
          // this.isSending = false;


        }
      },
    }
</script>

<style scoped>

</style>
