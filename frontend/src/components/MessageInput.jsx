import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, FileVideo, FileAudio, File } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");

  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null);
  const [fileData, setFileData] = useState(null); // { name, type, base64 }

  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (file.type.startsWith("image/")) {
        setImagePreview(base64);
      } else if (file.type.startsWith("video/")) {
        setVideoPreview(base64);
      } else if (file.type.startsWith("audio/")) {
        setAudioPreview(base64);
      } else {
        setFileData({
          name: file.name,
          type: file.type,
          base64,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const clearAll = () => {
    setText("");
    setImagePreview(null);
    setVideoPreview(null);
    setAudioPreview(null);
    setFileData(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (
      !text.trim() &&
      !imagePreview &&
      !videoPreview &&
      !audioPreview &&
      !fileData
    )
      return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
        video: videoPreview,
        audio: audioPreview,
        file: fileData?.base64,
        fileName: fileData?.name,
      });

      clearAll();
    } catch (error) {
      console.error("Failed to send message:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || error.message || "Message failed");
    }
  };

  return (
    <div className="p-4 w-full">
      {/* Previews */}
      <div className="mb-3 flex items-center gap-2 flex-wrap">
        {imagePreview && (
          <PreviewCard src={imagePreview} type="image" onRemove={() => setImagePreview(null)} />
        )}
        {videoPreview && (
          <PreviewCard src={videoPreview} type="video" onRemove={() => setVideoPreview(null)} />
        )}
        {audioPreview && (
          <PreviewCard src={audioPreview} type="audio" onRemove={() => setAudioPreview(null)} />
        )}
        {fileData && (
          <div className="relative flex items-center gap-2 p-2 border rounded-lg bg-zinc-800">
            <File size={20} />
            <span className="text-sm">{fileData.name}</span>
            <button onClick={() => setFileData(null)} className="absolute top-0 right-0">
              <X size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.zip,.txt"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />

          <button
            type="button"
            className="hidden sm:flex btn btn-circle text-zinc-400"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={
            !text.trim() &&
            !imagePreview &&
            !videoPreview &&
            !audioPreview &&
            !fileData
          }
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

const PreviewCard = ({ src, type, onRemove }) => (
  <div className="relative">
    {type === "image" && (
      <img src={src} className="w-20 h-20 object-cover rounded-lg border border-zinc-700" />
    )}
    {type === "video" && (
      <video src={src} controls className="w-20 h-20 rounded-lg border border-zinc-700" />
    )}
    {type === "audio" && (
      <audio src={src} controls className="w-40 rounded border border-zinc-700" />
    )}
    <button
      onClick={onRemove}
      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
      type="button"
    >
      <X className="size-3" />
    </button>
  </div>
);

export default MessageInput;
