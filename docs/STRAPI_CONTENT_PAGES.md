# Strapi content pages

Create a Strapi **Collection Type** named `Content Page` (`content-page`). The Next.js frontend reads it from `/api/content-pages` and renders each published entry at `/{slug}`.

## Fields

| Field | Strapi type | Required |
| --- | --- | --- |
| `title` | Short text | Yes |
| `slug` | UID, attached to `title` | Yes |
| `eyebrow` | Short text | No |
| `summary` | Long text | No |
| `body` | Blocks | Yes |
| `seoTitle` | Short text | No |
| `seoDescription` | Long text | No |

Enable `find` and `findOne` permissions for the Public role, then publish each entry.

## MVP entries

| Page | Slug | Footer URL |
| --- | --- | --- |
| About Us | `about-us` | `/about-us` |
| Contact | `contact` | `/contact` |
| How It Works | `how-it-works` | `/how-it-works` |
| FAQs | `faqs` | `/faqs` |
| Privacy Policy | `privacy` | `/privacy` |
| Terms and Conditions | `terms` | `/terms` |
| Shipping and Delivery | `shipping` | `/shipping` |

Returns is intentionally excluded from the current MVP.

Test an entry with:

```text
http://127.0.0.1:1337/api/content-pages?filters[slug][$eq]=about-us&populate=*
```

Strapi content is cached by Next.js. Published changes appear within five minutes for content pages.
