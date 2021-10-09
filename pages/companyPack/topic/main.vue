<template>
<button @click="add">新建问题</button>
</template>
<script>
  import WXAJAX from "@/utils/request";
  import {mapState} from "vuex";

  export default {
    components: {
    },
    data() {
      return {
      };
    },
    computed: {
    },
    onLoad(params) {
      this.type = params.type;
    },
    mounted() {
    },
    methods: {
      add(){
        wx.navigateTo({
          url: "/pages/companyPack/addtopic/main?type=" + this.type
        });
      }
    }

  };
</script>
