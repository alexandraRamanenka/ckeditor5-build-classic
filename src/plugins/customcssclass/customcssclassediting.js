import AttributeCommand from '@ckeditor/ckeditor5-basic-styles/src/attributecommand';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

const CUSTOM_CSS_CLASS = 'customCssClass';

export default class CustomCSSClassEditing extends Plugin {
	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		// Allow our custom attribute on text nodes.
		editor.model.schema.extend('$text', {allowAttributes: CUSTOM_CSS_CLASS});

		// Build converter from model to view for data and editing pipelines.

		editor.conversion.attributeToElement({
			model: CUSTOM_CSS_CLASS,
			view: {
				name: 'span',
				classes: 'ck-custom-inserted-link'
			}
		});

		// Create bold command.
		editor.commands.add(CUSTOM_CSS_CLASS, new AttributeCommand(editor, CUSTOM_CSS_CLASS));
	}
}
