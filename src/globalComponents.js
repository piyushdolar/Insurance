import DropDown from './components/Dropdown.vue';
import AlertBox from './components/AlertBox.vue';

/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
	install(Vue) {
		Vue.component('drop-down', DropDown);
		Vue.component('alert-box', AlertBox);
	}
};

export default GlobalComponents;
