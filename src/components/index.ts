
import { VueConstructor } from 'vue';
import Table from './m-table.vue';
import Img from './m-img.vue';
import CheckboxGroup from './m-checkbox-group.vue';
import SelectCategory from './m-select-category.vue';
import Upload from './m-upload.vue';


const VueInstaller = {
  install: (vue: VueConstructor) => {
    vue.component(Table.componentName, Table);
    vue.component(Img.componentName, Img);
    vue.component(CheckboxGroup.componentName, CheckboxGroup);
    vue.component(SelectCategory.componentName, SelectCategory);
    vue.component(Upload.componentName, Upload);
  },
};

export default VueInstaller;
