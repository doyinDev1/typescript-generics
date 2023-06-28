// Code goes here!

function autobind(
    _: any,
     _2: string,
      descriptor: PropertyDescriptor ) {

const originalMethod = descriptor.value;
const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
        const boundFn = originalMethod;
        return boundFn;
    }
};
return adjDescriptor
}

class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
         this.templateElement = <HTMLTemplateElement>document.getElementById('project-input')!;
         this.hostElement = document.getElementById('app')!as HTMLDivElement;
         const importedNode = document.importNode(this.templateElement.content, true);
         this.element = importedNode.firstElementChild as HTMLFormElement;
         this.element.id = 'user-input';

         this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
         this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
         this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
         this.configure();
         this.attach();
    }

        private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDesription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;    

    if (enteredTitle.trim().length === 0 || 
        enteredPeople.trim().length === 0 ||
        enteredPeople.trim().length === 0) {
    alert('Invalid input, please try again!')
      return
   } else {
    return [enteredTitle, enteredDesription, +enteredPeople];
}

        }
        private clearInputs() {
            this.titleInputElement.value = '';
            this.descriptionInputElement.value = '';
            this.peopleInputElement.value = '';
            
        }


    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        // console.log(this.titleInputElement.value);
        if (Array.isArray(userInput)){
            const [title, desc, people] = userInput;
            console.log(title, desc, people);
            this.clearInputs();
        }
    }
    private configure(){
        this.element.addEventListener('submit', this.submitHandler.bind(this));

    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element )
    }
}

const prjInput = new ProjectInput();