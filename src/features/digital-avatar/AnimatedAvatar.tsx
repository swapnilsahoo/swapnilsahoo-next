type AnimatedAvatarProps = {
  speaking?: boolean;
  listening?: boolean;
  active?: boolean;
  className?: string;
};

// The six generated expressions form a local animated likeness, not a trained
// video replica. Mouth motion follows playback state; it is not phoneme alignment.
export function AnimatedAvatar({
  speaking = false,
  listening = false,
  active = true,
  className = "",
}: AnimatedAvatarProps) {
  const isSpeaking = active && speaking;
  return (
    <div
      className={`avatar-animated ${className}`.trim()}
      data-testid="digital-guide-animated-avatar"
      data-speaking={isSpeaking}
      data-listening={active && listening}
    >
      <span className="avatar-animated-badge">AI-created likeness</span>
      <div
        className="avatar-animated-image"
        role="img"
        aria-label="Digitally created likeness of Dr. Swapnil Sahoo"
      />
      <span className="avatar-animated-caption">
        {isSpeaking
          ? "Speaking with a device voice"
          : active && listening
            ? "Listening to your question"
            : "Prepared website guidance"}
      </span>
    </div>
  );
}
