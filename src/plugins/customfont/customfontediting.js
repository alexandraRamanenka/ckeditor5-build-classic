import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import CustomFontCommand from './customfontcommand';
import { CUSTOM_FONT } from './customfont';

export default class CustomFontEditing extends Plugin {
	init() {
		const editor = this.editor;
		const customFont = editor.config.get( 'customFont' ) || {};
		const { color, underline, italic, bold } = customFont;

		const styles = { color };

		if ( underline ) {
			styles[ 'text-decoration' ] = 'underline';
		}

		if ( italic ) {
			styles[ 'font-style' ] = 'italic';
		}

		if ( bold ) {
			styles[ 'font-weight' ] = 'bold';
		}

		editor.conversion.for( 'upcast' ).elementToAttribute( {
			view: { name: 'span', styles },
			model: CUSTOM_FONT
		} );

		const style = Object.keys( styles ).map( key => `${ key }: ${ styles[ key ] }; ` ).join( '' );

		editor.conversion.for( 'downcast' ).attributeToElement( {
			model: CUSTOM_FONT,
			view: ( __modelAttributeValue, viewWriter ) => {
				return viewWriter.createAttributeElement( 'span', { style }, { priority: 7 } );
			}
		} );

		editor.commands.add( CUSTOM_FONT, new CustomFontCommand( editor ) );

		editor.model.schema.extend( '$text', { allowAttributes: CUSTOM_FONT } );

		editor.model.schema.setAttributeProperties( CUSTOM_FONT, {
			isFormatting: true,
			copyOnEnter: true
		} );
	}
}

export { CUSTOM_FONT };
