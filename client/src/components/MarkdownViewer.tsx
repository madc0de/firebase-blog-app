import * as React from 'react';
import * as showdown from 'showdown'


const converter = new showdown.Converter({
    simpleLineBreaks: true,
    tables: true,
    openLinksInNewWindow: true, 
    disableForced4SpacesIndentedSublists: true,
    simplifiedAutoLink: true
})

function htmlFromMarkdown(text: string) {
    return {
        __html: converter.makeHtml(text)
    }
}
 
interface MarkdownProps {
    markdown: string
}

const MarkdownViewer: React.SFC<MarkdownProps> = ({markdown}) => {
    const html = htmlFromMarkdown(markdown)
    return <div dangerouslySetInnerHTML={html} />
};

export default MarkdownViewer;