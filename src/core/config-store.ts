import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { clangFormatConfig, ClangFormatConfig } from '../core/formatter'

export interface ConfigState {
  config: ClangFormatConfig
  updateConfig: (newConfig: Partial<ClangFormatConfig>) => void
  resetConfig: () => void
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      config: clangFormatConfig,
      updateConfig: (newConfig) =>
        set((state) => ({
          config: { ...state.config, ...newConfig }
        })),
      resetConfig: () => set({ config: clangFormatConfig })
    }),
    {
      name: 'clang-format-config'
    }
  )
)