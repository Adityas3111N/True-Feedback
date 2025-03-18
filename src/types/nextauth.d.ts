import 'next-auth'

//ab hame next auth ke dwara banaye gaye user ke interface me thodi changing karni hai.

declare module 'next-auth' {
    interface User {
        _id?: string;
        isVerified?: boolean;
        isAcceptingMessages?: boolean;
        userName?: string;
    }

    interface Session {
        user: {
            _id?: string;
            isVerified?: boolean;
            isAcceptingMessages?: boolean;
            userName?: string;
        } & defaultSession['user']
    }
} //just to make token more power full. ab token ko nextauth ke user se sari props assign kr denge.

declare module 'next-auth/jwt' {
    interface JWT {
        id?: string;
        isVerified?: boolean;
        isAcceptingMessages?: boolean;
        userName?: string;
    }
}
