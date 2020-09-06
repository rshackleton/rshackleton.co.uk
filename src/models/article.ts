
import { ContentItem, Elements } from '@kentico/kontent-delivery';

/**
 * Generated by '@kentico/kontent-model-generator@3.2.0'
 * Tip: You can replace 'ContentItem' with another generated class to fully leverage strong typing.
 */
export class Article extends ContentItem {
    public slug!: Elements.UrlSlugElement;
    public contentNotes!: Elements.RichTextElement;
    public title!: Elements.TextElement;
    public summary!: Elements.TextElement;
    public themeTopic!: Elements.RichTextElement;
    public businessGoal!: Elements.RichTextElement;
    public date!: Elements.DateTimeElement;
    public transformation!: Elements.RichTextElement;
    public metadataPageTitle!: Elements.TextElement;
    public contentOutline!: Elements.RichTextElement;
    public banner!: Elements.AssetsElement;
    public metadataOpenGraphImage!: Elements.AssetsElement;
    public body!: Elements.RichTextElement;
    public motivation!: Elements.RichTextElement;
    public articleTags!: Elements.TaxonomyElement;
    public metadataPageDescription!: Elements.TextElement;
    public metadataPageKeywords!: Elements.TextElement;
    constructor() {
        super({
            propertyResolver: ((elementName: string) => {
                if (elementName === 'content_notes') {
                    return 'contentNotes';
                }
                if (elementName === 'theme___topic') {
                    return 'themeTopic';
                }
                if (elementName === 'business_goal') {
                    return 'businessGoal';
                }
                if (elementName === 'metadata__page_title') {
                    return 'metadataPageTitle';
                }
                if (elementName === 'content_outline') {
                    return 'contentOutline';
                }
                if (elementName === 'metadata__open_graph_image') {
                    return 'metadataOpenGraphImage';
                }
                if (elementName === 'article_tags') {
                    return 'articleTags';
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
