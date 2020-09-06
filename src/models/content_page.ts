
import { ContentItem, Elements } from '@kentico/kontent-delivery';

/**
 * Generated by '@kentico/kontent-model-generator@3.2.0'
 * Tip: You can replace 'ContentItem' with another generated class to fully leverage strong typing.
 */
export class ContentPage extends ContentItem {
    public body!: Elements.RichTextElement;
    public summary!: Elements.TextElement;
    public slug!: Elements.UrlSlugElement;
    public metadataPageTitle!: Elements.TextElement;
    public metadataOpenGraphImage!: Elements.AssetsElement;
    public metadataPageDescription!: Elements.TextElement;
    public metadataPageKeywords!: Elements.TextElement;
    public banner!: Elements.AssetsElement;
    public title!: Elements.TextElement;
    constructor() {
        super({
            propertyResolver: ((elementName: string) => {
                if (elementName === 'metadata__page_title') {
                    return 'metadataPageTitle';
                }
                if (elementName === 'metadata__open_graph_image') {
                    return 'metadataOpenGraphImage';
                }
                if (elementName === 'metadata__page_description') {
                    return 'metadataPageDescription';
                }
                if (elementName === 'metadata__page_keywords') {
                    return 'metadataPageKeywords';
                }
                return elementName;
            })
        });
    }
}
