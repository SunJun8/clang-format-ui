import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AppState {
  language: 'c' | 'cpp';
  sourceCode: string;
  formattedCode: string;
  isFormatting: boolean;
  formatDuration: number;
  diffCount: number;
  
  // Actions
  setLanguage: (language: 'c' | 'cpp') => void;
  setSourceCode: (code: string) => void;
  setFormattedCode: (code: string, duration: number) => void;
  setFormatting: (isFormatting: boolean) => void;
  setDiffCount: (count: number) => void;
  resetSourceCode: () => void;
}

const C_EXAMPLE = `#include <stdio.h>

int main() {
int x=5,y=10;
if(x<y){
printf("Hello, World!\n");
for(int i=0;i<x;i++){
printf("i: %d\n",i);
}
}
return 0;
}`;

const CPP_EXAMPLE = `#include <iostream>
#include <vector>
#include <algorithm>

class Example {
public:
Example(const std::vector<int>& data) : data_(data) {}

void process() {
std::sort(data_.begin(),data_.end());
for(const auto& item:data_) {
if(item>0) {
std::cout<<"Positive: "<<item<<std::endl;
}
}
}

private:
std::vector<int> data_;
};`;

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        language: 'cpp',
        sourceCode: CPP_EXAMPLE,
        formattedCode: '',
        isFormatting: false,
        formatDuration: 0,
        diffCount: 0,

        setLanguage: (language) => {
          set({ language });
          if (language === 'c') {
            set({ sourceCode: C_EXAMPLE });
          } else {
            set({ sourceCode: CPP_EXAMPLE });
          }
        },

        setSourceCode: (sourceCode) => set({ sourceCode }),

        setFormattedCode: (formattedCode, formatDuration) => 
          set({ formattedCode, formatDuration }),

        setFormatting: (isFormatting) => set({ isFormatting }),

        setDiffCount: (diffCount) => set({ diffCount }),

        resetSourceCode: () => {
          const state = useAppStore.getState();
          if (state.language === 'c') {
            set({ sourceCode: C_EXAMPLE });
          } else {
            set({ sourceCode: CPP_EXAMPLE });
          }
        },
      }),
      {
        name: 'clang-format-ui',
        partialize: (state) => ({
          language: state.language,
          sourceCode: state.sourceCode,
        }),
      }
    ),
    {
      name: 'clang-format-ui-store',
    }
  )
);