import FontCommand from '@ckeditor/ckeditor5-font/src/fontcommand';
import { CUSTOM_FONT } from './customfont';

export default class CustomFontCommand extends FontCommand {
	constructor( editor ) {
		super( editor, CUSTOM_FONT );
	}

	execute( options = {} ) {
		if ( !options.value ) {
			options.value = this.editor.config._config.customFont.color;
		}

		super.execute( options );
	}
}
