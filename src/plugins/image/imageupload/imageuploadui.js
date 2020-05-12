/* globals FileReader */

import FileDialogButtonView from '@ckeditor/ckeditor5-upload/src/ui/filedialogbuttonview';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';
import { createImageTypeRegExp } from '@ckeditor/ckeditor5-image/src/imageupload/utils';
import ModelElement from '@ckeditor/ckeditor5-engine/src/model/element';
import ImageUploadUI from '@ckeditor/ckeditor5-image/src/imageupload/imageuploadui';

const defaultInit = ImageUploadUI.prototype.init;
ImageUploadUI.prototype.init = function() {
	const isBase64Upload = this.editor.config.get( 'base64Upload' );
	if ( !isBase64Upload ) {
		return defaultInit.call( this );
	}
	const editor = this.editor;
	const t = editor.t;

	// Setup `imageUpload` button.
	editor.ui.componentFactory.add( 'imageUpload', locale => {
		const view = new FileDialogButtonView( locale );
		const command = editor.commands.get( 'imageUpload' );
		const imageTypes = editor.config.get( 'image.upload.types' );
		const imageTypesRegExp = createImageTypeRegExp( imageTypes );

		view.set( {
			acceptedType: imageTypes.map( type => `image/${ type }` ).join( ',' ),
			allowMultipleFiles: true
		} );

		view.buttonView.set( {
			label: t( 'Insert image' ),
			icon: imageIcon,
			tooltip: true
		} );

		view.buttonView.bind( 'isEnabled' ).to( command );

		view.on( 'done', ( evt, files ) => {
			for ( const file of Array.from( files ) ) {
				if ( imageTypesRegExp.test( file.type ) ) {
					const reader = new FileReader();
					reader.addEventListener( 'load', function() {
						editor.model.enqueueChange( () => {
							const imageElement = new ModelElement( 'image', {
								src: reader.result
							} );
							editor.model.insertContent( imageElement, editor.model.document.selection );
						} );
					}, false );
					if ( file ) {
						reader.readAsDataURL( file );
					}
				}
			}
		} );

		return view;
	} );
};

export default ImageUploadUI;
