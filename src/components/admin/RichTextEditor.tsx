"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";

import { useEffect, useState, useCallback } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Link as LinkIcon,
  Heading2,
  Heading3,
  Undo,
  Redo,
} from "lucide-react";

import type { Editor } from "@tiptap/react";
type EditorToolbarProps = {
  editor: Editor;
};

const escapeCSV = (val: unknown) => {
  if (val === null || val === undefined) return "";
  const str = String(val);
  if (/[",\r\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    let formattedUrl = url.trim();
    if (!/^(https?:\/\/|mailto:|tel:)/i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: formattedUrl, target: "_blank", rel: "noopener noreferrer" })
      .run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border-b border-gray-200 rounded-t-md">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive("bold") ? "bg-gray-200 text-amber-700 font-semibold" : "text-gray-600"
        }`}
        title="Bold"
      >
        <Bold size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive("italic") ? "bg-gray-200 text-amber-700 font-semibold" : "text-gray-600"
        }`}
        title="Italic"
      >
        <Italic size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive("underline") ? "bg-gray-200 text-amber-700 font-semibold" : "text-gray-600"
        }`}
        title="Underline"
      >
        <UnderlineIcon size={16} />
      </button>

      <span className="w-px h-6 bg-gray-200 mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive("heading", { level: 2 }) ? "bg-gray-200 text-amber-700 font-semibold" : "text-gray-600"
        }`}
        title="Heading 2"
      >
        <Heading2 size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive("heading", { level: 3 }) ? "bg-gray-200 text-amber-700 font-semibold" : "text-gray-600"
        }`}
        title="Heading 3"
      >
        <Heading3 size={16} />
      </button>

      <span className="w-px h-6 bg-gray-200 mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive("bulletList") ? "bg-gray-200 text-amber-700 font-semibold" : "text-gray-600"
        }`}
        title="Bullet List"
      >
        <List size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive("orderedList") ? "bg-gray-200 text-amber-700 font-semibold" : "text-gray-600"
        }`}
        title="Numbered List"
      >
        <ListOrdered size={16} />
      </button>

      <span className="w-px h-6 bg-gray-200 mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive({ textAlign: 'left' }) ? "bg-gray-200 text-amber-700 font-semibold" : "text-gray-600"
        }`}
        title="Align Left"
      >
        <AlignLeft size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive({ textAlign: 'center' }) ? "bg-gray-200 text-amber-700 font-semibold" : "text-gray-600"
        }`}
        title="Align Center"
      >
        <AlignCenter size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive({ textAlign: 'right' }) ? "bg-gray-200 text-amber-700 font-semibold" : "text-gray-600"
        }`}
        title="Align Right"
      >
        <AlignRight size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive({ textAlign: 'justify' }) ? "bg-gray-200 text-amber-700 font-semibold" : "text-gray-600"
        }`}
        title="Align Justify"
      >
        <AlignJustify size={16} />
      </button>

      <span className="w-px h-6 bg-gray-200 mx-1" />

      <button
        type="button"
        onClick={setLink}
        className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${
          editor.isActive("link") ? "bg-gray-200 text-amber-700 font-semibold" : "text-gray-600"
        }`}
        title="Add Link"
      >
        <LinkIcon size={16} />
      </button>

      <span className="w-px h-6 bg-gray-200 mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-600 disabled:opacity-30"
        title="Undo"
      >
        <Undo size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="p-1.5 rounded hover:bg-gray-200 transition-colors text-gray-600 disabled:opacity-30"
        title="Redo"
      >
        <Redo size={16} />
      </button>
    </div>
  );
};

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-amber-600 underline hover:text-amber-700 cursor-pointer",
        },
      }),
      TextAlign.configure({
  types: ["heading", "paragraph"],
  alignments: ["left", "center", "right", "justify"],
}),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "focus:outline-none min-h-[400px] p-4 text-sm text-gray-800 bg-white rounded-b-md " +
          "prose max-w-none " +
          "[&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:font-serif [&_h2]:text-gray-900 " +
          "[&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-3 [&_h3]:mb-1 [&_h3]:font-serif [&_h3]:text-gray-900 " +
          "[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 " +
          "[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2 " +
          "[&_p]:my-2 " +
          "[&_a]:text-amber-600 [&_a]:underline hover:[&_a]:text-amber-700 [&_a]:cursor-pointer",
      },
    },
  });

  // Keep editor content in sync when value is loaded asynchronously
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="border border-gray-300 rounded-md bg-white min-h-[440px] flex items-center justify-center">
        <span className="text-sm text-gray-400">Loading editor…</span>
      </div>
    );
  }

  return (
    <div className="border border-gray-300 rounded-md bg-white focus-within:ring-2 focus-within:ring-amber-400 focus-within:border-transparent transition-all">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
