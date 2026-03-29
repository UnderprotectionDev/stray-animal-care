# Seed Photos Design

**Date**: 2026-03-29
**Status**: Approved

## Overview

Replace generic PayloadCMS template images with curated Unsplash photos that evoke empathy and engagement for a stray animal care website.

## Decisions

- **Source**: Unsplash fixed URLs (specific photo IDs, deterministic)
- **Count**: 18 photos
- **Distribution**: 50% cats, 50% dogs
- **Emotional tone**: 70% warm/cute, 30% melancholic/needy
- **File structure**: Single `src/endpoints/seed/images.ts` (replaces image-1.ts, image-2.ts, image-3.ts, image-hero-1.ts)

## Photo Inventory

### Animal Profiles (4)

| Key | Description | Search Criteria | Tone |
|-----|-------------|-----------------|------|
| `portakal` | Orange tabby cat, warm gaze, sunbathing | orange tabby cat portrait | Cute |
| `findik` | Brown young cat, curious look | brown young cat playful | Cute |
| `cesur` | Kangal/Anatolian shepherd, loyal stance | anatolian shepherd dog | Strong/Loyal |
| `zeytin` | Black mixed-breed dog, sad eyes | sad black dog shelter | Melancholic |

### Hero Images (2)

| Key | Description | Search Criteria | Tone |
|-----|-------------|-----------------|------|
| `heroHome` | Cat + city silhouette, wide angle | stray cat city street | Dramatic |
| `heroGeneral` | Dog + street scene, wide angle | street dog urban | Dramatic |

### Blog Post Images (9)

| Key | Post | Description | Search Criteria | Tone |
|-----|------|-------------|-----------------|------|
| `postDeprem` | Post 1 | Earthquake rescue | rescue cat earthquake rubble | Emotional |
| `postPortakal` | Post 2 | Portakal's story | orange cat happy adopted | Cute |
| `postKis` | Post 3 | Winter feeding | cat snow winter feeding | Warm |
| `postCesur` | Post 4 | Cesur's transformation | brave dog transformation | Hope |
| `postKisir` | Post 5 | Spay/neuter campaign | vet clinic cat spay | Informative |
| `postFindik` | Post 6 | Findik's recovery | kitten recovering | Hope |
| `postBesleme` | Post 7 | Daily feeding tour | feeding stray cats bowls | Warm |
| `postEtkinlik` | Post 8 | Community event | animal adoption event | Cheerful |
| `postZeytin` | Post 9 | Zeytin's treatment diary | injured dog healing bandage | Melancholic/Hope |

### Emergency / Emotional (2)

| Key | Description | Search Criteria | Tone |
|-----|-------------|-----------------|------|
| `emergencyVet` | Animal being treated at vet | dog vet treatment | Emotional |
| `emergencyStreet` | Cat in cold/rain on the street | stray cat cold rain | Melancholic |

### Activity (1)

| Key | Description | Search Criteria | Tone |
|-----|-------------|-----------------|------|
| `activityFeeding` | Volunteers feeding strays | volunteers feeding stray animals | Warm |

## Technical Implementation

1. Delete `image-1.ts`, `image-2.ts`, `image-3.ts`, `image-hero-1.ts`
2. Create `src/endpoints/seed/images.ts` with all 18 photo definitions
3. Update `index.ts` to use new images structure
4. Map each post to its matching photo
5. Add photo field to animal seed data
6. Alt text: Turkish, descriptive, SEO-friendly

## Alt Text Strategy

- Animal profiles: name + type + context (e.g., "Portakal -- 3 yasinda turuncu tekir kedi")
- Blog posts: topic-relevant description
- Heroes: scene description with emotional context
