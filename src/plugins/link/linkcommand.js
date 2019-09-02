import LinkCommand from '@ckeditor/ckeditor5-link/src/linkcommand';
import findLinkRange from '@ckeditor/ckeditor5-link/src/findlinkrange';
import toMap from '@ckeditor/ckeditor5-utils/src/tomap';

const defaultExecute = LinkCommand.prototype.execute;
LinkCommand.prototype.execute = function( href, text, isCustom ) {
	if ( !isCustom ) {
		return defaultExecute.apply( this, [ href ] );
	}
	const model = this.editor.model;
	const selection = model.document.selection;

	model.change( writer => {
		// If selection is collapsed then update selected link or insert new one at the place of caret.
		if ( selection.isCollapsed ) {
			const position = selection.getFirstPosition();

			// When selection is inside text with `linkHref` attribute.
			if ( selection.hasAttribute( 'linkHref' ) ) {
				// Then update `linkHref` value.
				const linkRange = findLinkRange( selection.getFirstPosition(), selection.getAttribute( 'linkHref' ), model );

				writer.setAttribute( 'linkHref', href, linkRange );
				writer.setAttribute( 'customCssClass', true, linkRange );

				// Create new range wrapping changed link.
				writer.setSelection( linkRange );
			}
			// If not then insert text node with `linkHref` attribute in place of caret.
			// However, since selection in collapsed, attribute value will be used as data for text node.
			// So, if `href`/ 'text' is empty, do not create text node.
			else if ( text !== '' || href !== '' ) {
				const attributes = toMap( selection.getAttributes() );

				attributes.set( 'linkHref', href );
				// add span with custom css class to indicate that link is inserted by custom outer action
				attributes.set( 'customCssClass', true );

				const node = writer.createText( text ? text : href, attributes );

				writer.insert( node, position );

				// Create new range wrapping created node.
				writer.setSelection( writer.createRangeOn( node ) );

				// Create new paragraph after link to clear selection
				const root = this.editor.model.document.getRoot();
				const paragraph = writer.createElement( 'paragraph' );

				writer.append( paragraph, root );
				writer.setSelection( paragraph, 'in' );

				this.editor.editing.view.focus();
			}
		} else {
			// If selection has non-collapsed ranges, we change attribute on nodes inside those ranges
			// omitting nodes where `linkHref` attribute is disallowed.
			const ranges = model.schema.getValidRanges( selection.getRanges(), 'linkHref' );

			for ( const range of ranges ) {
				writer.setAttribute( 'linkHref', href, range );
				writer.setAttribute( 'customCssClass', true, range );
			}
		}
	} );
};

export default LinkCommand;
