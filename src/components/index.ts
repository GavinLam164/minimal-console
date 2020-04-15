
import { VueConstructor } from 'vue';
import Table from './m-table.vue';


const VueInstaller = {
  install: (vue: VueConstructor) => {
    vue.component(Table.componentName, Table);
  },
};

export default VueInstaller;
