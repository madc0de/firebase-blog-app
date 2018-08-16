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
    text: string
}

const Markdown: React.SFC<MarkdownProps> = ({text}) => {
    const html = htmlFromMarkdown(text)
    return <div dangerouslySetInnerHTML={html} />
};

export default Markdown;