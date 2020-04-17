import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const initDict = (fileLoader: any): Record<string, string> => {
  const dict: Record<string, string> = {};
  const getModuleName = (filePath: string): string => filePath.split('/')[1];
  fileLoader.keys().forEach((filePath: string) => {
    Object.assign(dict, {
      [getModuleName(filePath)]: fileLoader(filePath),
    });
  });
  return dict;
};

const initEnDict = (): Record<string, string> => initDict(require.context('.', true, /en\.json$/));
const initZhCNDict = (): Record<string, string> => initDict(require.context('.', true, /zh-CN\.json$/));

const messages = {
  en: initEnDict(),
  'zh-CN': initZhCNDict(),
};

console.log(messages);

const i18n: VueI18n = new VueI18n({
  locale: 'zh-CN',
  fallbackLocale: 'en',
  messages,
});


export default i18n;
