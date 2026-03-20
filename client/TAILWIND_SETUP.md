# Tailwind CSS & shadcn/ui Setup Guide

This project has been configured to use **Tailwind CSS** and **shadcn/ui** component library.

## Installation & Configuration

### Dependencies Installed
- `tailwindcss` - CSS utility framework
- `postcss` - CSS processing tool
- `autoprefixer` - Vendor prefix automation
- `class-variance-authority` - Component variant management
- `clsx` - Class concatenation utility
- `lucide-react` - Icon library
- `tailwind-merge` - Tailwind class merging

## File Structure

```
client/
├── tailwind.config.js        # Tailwind configuration
├── postcss.config.js         # PostCSS configuration
├── components.json           # shadcn/ui configuration
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components go here
│   │   │   └── button.jsx   # Example button component
│   │   ├── sections/        # Page sections
│   │   ├── layout/          # Layout components
│   │   └── common/          # Shared components
│   ├── lib/
│   │   └── utils.js         # Utility functions (cn helper)
│   └── styles/
│       └── global.css       # Global styles with @tailwind directives
```

## Configuration Files

### tailwind.config.js
Configured with:
- Content paths for file scanning
- Extended theme with CSS variable integration
- Custom colors, fonts, and typography

### postcss.config.js
Includes:
- tailwindcss plugin
- autoprefixer plugin

### components.json
shadcn/ui configuration for:
- Component paths and aliases
- TypeScript support
- Tailwind configuration reference

## Using shadcn/ui Components

### Option 1: Manual Installation
Copy component files directly into `src/components/ui/` directory.

### Option 2: Using CLI (if available)
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
# etc.
```

### Importing Components
```jsx
import { Button } from "@/components/ui/button"

export function MyComponent() {
  return <Button>Click me</Button>
}
```

## Using Tailwind CSS

Apply Tailwind utility classes directly to elements:

```jsx
export function Example() {
  return (
    <div className="flex items-center justify-center p-4 bg-slate-100 rounded-lg">
      <h1 className="text-2xl font-bold text-slate-900">Hello Tailwind!</h1>
    </div>
  )
}
```

## CSS Variables Integration

The project integrates your existing CSS variables with Tailwind. Reference them in:
- `tailwind.config.js` for theme customization
- Global styles for base setup

## Useful Commands

```bash
# Development
npm run dev

# Build
npm run build

# Preview
npm run preview

# Add new shadcn/ui component (when available)
npx shadcn-ui@latest add [component-name]
```

## Transitioning Existing Styles

### Before (Plain CSS)
```css
.button {
  padding: 0.5rem 1rem;
  background-color: #aa3bff;
  color: white;
  border-radius: 0.375rem;
}
```

### After (Tailwind)
```jsx
<button className="px-4 py-2 bg-purple-600 text-white rounded-md">
  Click me
</button>
```

## Best Practices

1. **Use utility classes** instead of writing custom CSS when possible
2. **Create components** for repeated patterns (buttons, cards, etc.)
3. **Use shadcn/ui components** as base for complex UI elements
4. **Keep custom CSS** in dedicated `.css` files for complex layouts
5. **Organize components** in `src/components/ui/` for UI library components

## Troubleshooting

- If styles aren't applying, ensure `@tailwind` directives are in `src/styles/global.css`
- Check that `src/index.css` imports the global styles
- Verify `tailwind.config.js` content paths include your component files
- Clear `.next` or `dist` folder and rebuild if needed

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind UI Components](https://tailwindui.com/)
