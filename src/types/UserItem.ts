export interface UserItem {
    readonly id: string;
    readonly username: string;
    readonly email: string;
    readonly phone: string;
    readonly website: string;
    readonly avatar?: string;
    readonly address: {
        readonly street: string;
        readonly suite: string;
        readonly city: string;
        readonly zipcode: string;
        readonly geo: {
            readonly lat: string;
            readonly lng: string;
        };
    };
    readonly company: {
        readonly name: string;
        readonly catchPhrase: string;
        readonly bs: string;
    };
}
