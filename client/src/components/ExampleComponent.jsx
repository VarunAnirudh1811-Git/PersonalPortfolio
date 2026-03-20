/**
 * Example Component - Tailwind CSS & shadcn/ui
 * 
 * This file demonstrates how to:
 * 1. Use Tailwind utility classes
 * 2. Import and use shadcn/ui components
 * 3. Combine custom styling with utilities
 */

import { Button } from '@/components/ui/button'

export function ExampleComponent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      {/* Card Container */}
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Tailwind CSS
        </h1>
        <p className="text-slate-600 text-sm mb-6">
          Now integrated with shadcn/ui components
        </p>

        {/* Content Section */}
        <div className="space-y-4 mb-8">
          {/* Feature Item 1 */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mt-1">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Utility-First CSS</h3>
              <p className="text-slate-600 text-sm">
                Apply styles directly to elements
              </p>
            </div>
          </div>

          {/* Feature Item 2 */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mt-1">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Pre-built Components</h3>
              <p className="text-slate-600 text-sm">
                Use shadcn/ui components out of the box
              </p>
            </div>
          </div>

          {/* Feature Item 3 */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mt-1">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Responsive Design</h3>
              <p className="text-slate-600 text-sm">
                Mobile-first responsive utilities built-in
              </p>
            </div>
          </div>
        </div>

        {/* Button Group */}
        <div className="flex gap-3">
          <Button variant="default" className="flex-1">
            Primary Button
          </Button>
          <Button variant="outline" className="flex-1">
            Secondary
          </Button>
        </div>

        {/* Additional Button Variants */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <Button variant="secondary" size="sm" className="w-full">
            Secondary
          </Button>
          <Button variant="ghost" size="sm" className="w-full">
            Ghost
          </Button>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-8 max-w-md text-center">
        <p className="text-slate-600 text-sm">
          💡 Tip: Hover over buttons to see interactive states. 
          Check the component files to learn how Tailwind classes are applied.
        </p>
      </div>
    </div>
  )
}

export default ExampleComponent
