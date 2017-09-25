### Headings
The HTML `<h1>–<h6>` elements represent six levels of section headings. <h1> is the highest section level and `<h6>` is the lowest.

###### Usage Notes

* Heading information may be used by user agents, for example, to construct a table of contents for a document automatically.
* Do not use lower levels to decrease heading font size: use the CSS font-size property instead.
* Avoid skipping heading levels: always start from `<h1>`, next use `<h2>` and so on.
You should consider avoiding using `<h1>` more than once on a page.

#### Heading 1
```jsx
const H1 = require('/').H1;
<H1>Inspire the lazy</H1>
```
#### Heading 2
```jsx
const H2 = require('/').H2;
<H2>Inspire the lazy</H2>
```
#### Heading 3
```jsx
const H3 = require('/').H3;
<H3>Inspire the lazy</H3>
```
#### Heading 4
```jsx
const H4 = require('/').H4;
<H4>Inspire the lazy</H4>
```
### Paragraph

The HTML `<p>` element represents a paragraph of text. Paragraphs are usually represented in visual media as blocks of text that are separated from adjacent blocks by vertical blank space and/or first-line indentation. Paragraphs are block-level elements.
```jsx
const P = require('/').P;
<P>Joyent experts provide 360 degree support for modern application architectures, including development frameworks, container orchestration tools, and hybrid cloud infrastructures.</P>
```

### Small

The HTML `<small>` element makes the text font size one size smaller (for example, from large to medium, or from small to x-small) down to the browser's minimum font size.  In HTML5, this element is repurposed to represent side-comments and small print, including copyright and legal text, independent of its styled presentation.
```jsx
const Small = require('/').Small;
<Small>
Triton is 100% open source and designed to eliminate cloud provider lock-in. With support for popular container management tools like Kubernetes, augmented by our own open source project ContainerPilot, we are working with the community to deliver simple to operate platform services that are open and portable.
</Small>
```

### Label

The HTML `<label>` element represents a caption for an item in a user interface.
```jsx
const Label = require('/').Label;
<Label>
Hybrid, Modern and Open, Triton is engineered to run the world’s largest cloud native applications
</Label>
```

### Links
The HTML `<a>` element (or anchor element) creates a hyperlink to other web pages, files, locations within the same page, email addresses, or any other URL.

This is called `Anchor` because of how React Router calls routing links `Link`


#### Primary
```
const Anchor = require('/').Anchor;
<Anchor>Inspire the lazy</Anchor>
```

#### Secondary
```
const Anchor = require('/').Anchor;
<span style={{'background-color': '#343434'}}>
  <Anchor secondary>Inspire the lazy secondary</Anchor>
</span>
```
#### Disabled
```
 const Anchor = require('/').Anchor;
 <Anchor secondary disabled>Inspire the lazy disabled</Anchor>
```