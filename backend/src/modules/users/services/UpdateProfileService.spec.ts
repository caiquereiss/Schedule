// import AppError from '@shared/errors/AppError';

import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService'


let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
beforeEach(() => {
   fakeUsersRepository = new FakeUsersRepository();
   fakeHashProvider = new FakeHashProvider();

   updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
  );
});
  it('should be able to update the profile', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Caique Soares',
      email: 'caiquesoares@hotmail.com',
      password:'123456'

    });

    const updatedUser = await updateProfile.execute({
        user_id: user.id,
        name: 'Caique Reis',
        email: 'caiquereis@hotmail.com',


    });
    expect(updatedUser.name).toBe('Caique Reis');
    expect(updatedUser.email).toBe('caiquereis@hotmail.com');
  });
  it('should be able to change to another user email', async () => {

    await fakeUsersRepository.create({
      name: 'Caique Soares',
      email: 'caiquesoares@hotmail.com',
      password:'123456',

    });

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@hotmail.com',
      password:'123456',

    });

    await expect(
     updateProfile.execute({
        user_id: user.id,
        name: 'Caique Soares',
        email: 'caiquesoares@hotmail.com',
    }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to update the password', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Caique Soares',
      email: 'caiquesoares@hotmail.com',
      password:'123456'

    });

    const updatedUser = await updateProfile.execute({
        user_id: user.id,
        name: 'Caique Reis',
        email: 'caiquereis@hotmail.com',
        old_password: '123456',
        password: '222333',


    });
    expect(updatedUser.password).toBe('222333');

  });
  it('should not be able to update the password without old password', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Caique Soares',
      email: 'caiquesoares@hotmail.com',
      password:'123456'

    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Caique Reis',
        email: 'caiquereis@hotmail.com',
        password: '222333',
      }),
    ).rejects.toBeInstanceOf(AppError);

  });
  it('should  not be able update the profile from non-existing user', async () => {

    expect(
      updateProfile.execute({
      user_id: 'non-existing-user-id',
      name: 'Test',
      email: 'Test@gmail.com'
  }),
  ).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to update the password with wrong old password', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Caique Soares',
      email: 'caiquesoares@hotmail.com',
      password:'123456'

    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Caique Reis',
        email: 'caiquereis@hotmail.com',
        old_password: 'wrong-old-password',
        password: '222333',
      }),
    ).rejects.toBeInstanceOf(AppError);

  });

});
