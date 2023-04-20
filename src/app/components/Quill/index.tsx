import ReactQuill from 'react-quill';

type Props = {
  className?: string;
  [key: string]: any;
};

const QuillEditor = ({ className, ...rest }: Props) => {
  return <ReactQuill className="react-quill" {...rest} />;
};

export default QuillEditor;
