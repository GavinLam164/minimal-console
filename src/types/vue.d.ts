import Vue from 'vue';


declare module 'element-ui/types/notification' {
  interface ElNotification {
    closeAll(): void;
  }
}


declare module 'vue/types/vue' {
  interface Vue {
    $myProperty: string;
  }

  interface VueConstructor {
    componentName: string;
  }

}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    myOption?: string;
  }
}
