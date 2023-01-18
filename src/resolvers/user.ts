import argon2 from 'argon2';
import {
	Arg,
	Field,
	InputType,
	Mutation,
	ObjectType,
	Resolver,
} from 'type-graphql';
import { User } from '../entities';
import { appDataSource } from '../ormConfig';

@InputType() // Used for arguments
class UsernamePasswordInput {
	@Field()
	username: string;
	@Field()
	password: string;
}

@ObjectType()
class FieldError {
	@Field()
	field: string;
	@Field()
	message: string;
}

@ObjectType() // Used for responses
class UserResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => User, { nullable: true })
	user?: User;
}

@Resolver()
export class UserResolver {
	@Mutation(() => UserResponse)
	async register(
		@Arg('options') options: UsernamePasswordInput
		// @Ctx TODO: context for apollo
	): Promise<UserResponse> {
		const { password, username } = options;

		// TODO: validation

		const hashedPassword = await argon2.hash(password);

		const user = appDataSource.getRepository(User).create({
			username: username.toLowerCase(),
			password: hashedPassword,
		});

		try {
			await user;
		} catch (error) {}

		return { user };
	}
}
