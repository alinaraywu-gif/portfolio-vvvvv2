import { assetPath } from "../utils/assetPath";

export default function AnimatedAvatar({ className }: { className?: string }) {
  return (
    <img
      alt="Neeko Wu 个人头像动效"
      className={className}
      draggable={false}
      src={assetPath("assets/neeko-avatar.webp")}
    />
  );
}
