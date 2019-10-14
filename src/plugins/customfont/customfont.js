import CustomFontEditing from './customfontediting';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

const CUSTOM_FONT = 'customFont';

export default class CustomFont extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ CustomFontEditing ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return CUSTOM_FONT;
	}
}

export { CUSTOM_FONT };
