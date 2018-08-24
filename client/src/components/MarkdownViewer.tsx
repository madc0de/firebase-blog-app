import * as React from 'react';
import * as showdown from 'showdown'

const converter = new showdown.Converter()
converter.setOption('simpleLineBreaks', true)
converter.setOption('tables', true)
converter.setOption('openLinksInNewWindow', true)

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