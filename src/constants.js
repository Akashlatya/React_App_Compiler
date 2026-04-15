export const CODE_SNIPPETS = {
    javascript: `// JavaScript Online Compiler

console.log("Welcome to OG Compiler");

//Enter your code here


`,
    python: `# Python Online Compiler

print("Welcome to OG Compiler")

# Enter your code here


`,
    java: `// Java Online Compiler
import java.util.*;

public class Main {
    public static void main(String[] args) {
        System.out.println("Welcome to OG Compiler");

       //Enter your code here


    }
}
`,
    c: `// C Online Compiler
#include <stdio.h>

int main() {
    printf("Welcome to OG Compiler\\n");

  //Enter your code here

}
`,
    cpp: `// C++ Online Compiler
#include <iostream>

int main() {
    std::cout << "Welcome to OG Compiler" << std::endl;

  //Enter your code here

    
}
`
};

export const DSA_CODE_SNIPPETS = {


    java: `// DSA - Java Online Compiler
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
      System.out.println("Welcome to OG Compiler");
    //Enter your code here



    }
}
`,
    python: `# DSA - Python Online Compiler

    print("Welcome to OG Compiler")

# Enter your code here


`,
    c: `// DSA - C
#include <stdio.h>

int main() {
    printf("Welcome to OG Compiler\\n");
   //Enter your code here


}
`,
    cpp: `// DSA - C++ 
#include <iostream>
using namespace std;

int main() {
    std::cout << "Welcome to OG Compiler" << std::endl;

   //Enter your code here


}
`
};



export const LANGUAGES = [
    {
        id: 'python',
        name: 'Python 3.12',
        description: 'Latest stable release with standard library support.',

        icon: '🐍',
        color: '#3572A5',
        badge: 'Popular'
    },
    {
        id: 'java',
        name: 'Java 21 LTS',
        description: 'OpenJDK 21 (Eclipse Temurin) environment.',

        icon: '☕',
        color: '#b07219',
        badge: 'Free Tier'
    },
    {
        id: 'cpp',
        name: 'C++ (GCC 13)',
        description: 'Modern C++ compiler with full C++23 support.',

        icon: 'C',
        color: '#f34b7d',
        badge: 'Fast'
    },
    {
        id: 'javascript',
        name: 'JavaScript',
        description: 'JavaScript runtime built on Chrome\'s V8 engine.',

        icon: 'JS',
        color: '#f1e05a',
        badge: 'Web'
    },
    {
        id: 'c',
        name: 'C (GCC 13)',
        description: 'Standard C17 compiler for systems programming.',

        icon: 'C',
        color: '#555555',
        badge: 'Classic'
    },
    {
        id: 'dsa',
        name: 'DSA Practice',
        description: 'Optimized environment for competitive programming.',

        icon: '🧩',
        color: '#89e051',
        path: '/dsa/Compiler',
        badge: 'New'
    }
];

export const FEATURES = [
    {
        icon: '⚡',
        title: 'Instant Execution',
        description: 'Advanced Docker containerization ensures your code runs safely and immediately.'
    },
    {
        icon: '🌍',
        title: 'Multi-Language',
        description: 'Support for all major programming languages including Java, Python, C++, and more.'
    },
    {
        icon: '🔒',
        title: 'Secure Sandbox',
        description: 'Enterprise-grade sandboxing protects your code and our infrastructure.'
    },
    {
        icon: '💎',
        title: 'Free to Use',
        description: 'Completely free for students and developers. No hidden charges.',
        type: 'highlight'
    },
    {
        icon: '🛠️',
        title: '24/7 Support',
        description: 'Our AI assistant is online 24/7 to help you debug and resolve issues.',
        type: 'highlight'
    },
    {
        icon: '⭐',
        title: 'Community Rated',
        description: 'Rated 4.9/5 stars by over 10,000 developers worldwide.',
        type: 'highlight'
    }
];
