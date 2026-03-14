import React from 'react'
import {
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Music2,
  Linkedin,
  Github,
  Globe,
  MessageCircle,
  Phone,
  Mail,
} from 'lucide-react'

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  instagram: Instagram,
  'x-twitter': Twitter,
  facebook: Facebook,
  youtube: Youtube,
  tiktok: Music2,
  linkedin: Linkedin,
  github: Github,
  globe: Globe,
  website: Globe,
  whatsapp: MessageCircle,
  phone: Phone,
  email: Mail,
  'message-circle': MessageCircle,
  mail: Mail,
}

export function SocialIcon({
  icon,
  className,
}: {
  icon: string
  className?: string
}) {
  const IconComponent = iconMap[icon] || Globe
  return <IconComponent className={className} />
}
