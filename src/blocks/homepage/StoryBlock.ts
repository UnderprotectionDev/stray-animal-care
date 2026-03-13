import type { Block } from 'payload'

export const StoryBlock: Block = {
  slug: 'homeStory',
  labels: { singular: 'Hikaye', plural: 'Hikaye' },
  fields: [
    { name: 'enabled', type: 'checkbox', defaultValue: true, label: 'Aktif' },
    { name: 'sectionTitle', type: 'text', localized: true, defaultValue: 'HİKAYEMİZ & MİSYON' },
    { name: 'founderImage', type: 'upload', relationTo: 'media', label: 'Kurucu Görseli' },
    { name: 'founderCaption', type: 'text', localized: true, defaultValue: 'AYŞE KAYA, 2019' },
    { name: 'founderName', type: 'text', localized: true, defaultValue: 'Ayşe' },
    { name: 'originTitle', type: 'text', localized: true, defaultValue: 'BAŞLANGIÇ' },
    { name: 'originQuote', type: 'text', localized: true, defaultValue: 'Birini kurtarmak dünyayı değiştirmez. Ama o birinin dünyasını değiştirir.' },
    { name: 'originParagraph1', type: 'textarea', localized: true, defaultValue: 'Her şey 2019\'da soğuk bir kış gecesi, kapımın önünde titreyen yaralı bir kediyle başladı. Onu veterinere götürdüm, tedavi ettirdim ve o gece fark ettim — bu sadece bir kedi değildi, bir sorumluluktu.' },
    { name: 'originParagraph2', type: 'textarea', localized: true, defaultValue: 'O günden bu yana yüzlerce can kurtardık. Her birinin hikayesi farklı ama hepsinin ortak noktası aynı: onlara sahip çıkacak birinin olması yeterli.' },
    { name: 'missionText', type: 'textarea', localized: true, defaultValue: 'Misyonumuz net: Acil tıbbi müdahale gerektiren vakalara anında ulaşmak, sokaklardaki popülasyonu etik yöntemlerle kontrol altına almak ve kalıcı yuva bulana kadar onlara güvenli bir sığınak olmak.' },
  ],
}
