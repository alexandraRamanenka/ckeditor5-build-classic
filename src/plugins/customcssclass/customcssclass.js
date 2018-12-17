import CustomCSSClassEditing from './customcssclassediting';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

//const CUSTOM_CSS_CLASS = 'customCssClass';


export default class CustomCSSClass extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [CustomCSSClassEditing];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'customCssClass';
	}
}
