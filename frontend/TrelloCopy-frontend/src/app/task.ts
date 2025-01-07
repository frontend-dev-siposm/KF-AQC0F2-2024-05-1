export class Task {
    id: number | null = null
    name: string = ''
    description: string = ''
    isCompleted: boolean | null = null
    hasOwner: boolean | null = null
    //Owner
    projectId: number | null = null
}
