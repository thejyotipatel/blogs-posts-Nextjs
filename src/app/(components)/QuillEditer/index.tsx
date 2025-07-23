'use client'

import { useEffect } from 'react'
import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'

type Props = {
  content: string
  setContent: (value: string) => void
}

export default function QuillEditor({ content, setContent }: Props) {
  const { quill, quillRef } = useQuill()

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(content)

      quill.on('text-change', () => {
        setContent(quill.root.innerHTML)
      })
    }
  }, [quill, content, setContent])

  return (
    <div style={{ width: '100%', minHeight: '100%' }}>
      <div ref={quillRef} />
    </div>
  )
}
