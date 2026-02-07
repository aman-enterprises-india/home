import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export function Richtext({ content }: { content: SerializedEditorState }) {
    if (!content) return null

    return (
        <div className="prose prose-zinc dark:prose-invert max-w-none whitespace-pre-wrap">
            {/* This component handles the mapping from JSON nodes to HTML elements */}
            <PayloadRichText data={content} />
        </div>
    )
}