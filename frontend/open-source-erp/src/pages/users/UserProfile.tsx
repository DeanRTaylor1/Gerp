import UserProfileForm from '../../Components/forms/UserProfileForm';
import { useTheme } from '../../hooks/useTheme';
import useTranslator from '../../hooks/useTranslator';
import Card from '../../layout/Card';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const { getColorClasses } = useTheme();
  const primary = getColorClasses('primary');

  const translator = useTranslator();

  return (
    <>
      <div className="flex flex-col gap-14">
        Profile
        <div className="flex gap-8 min-h-full">
          <Card className="min-h-[90%]">
            <section className="min-w-72 h-[450px]">Profile</section>
          </Card>
          <Card className="px-0 ">
            <section>
              <div
                className={`min-h-full flex justify-center items-center ${primary}`}
              >
                <div
                  className={`flex flex-col items-center justify-center ${primary}`}
                >
                  <div className="flex flex-col justify-center items-center gap-4 max-w-lg min-w-[350px] px-5 py-16 text-center md:px-10 md:py-24 lg:py-0">
                    <h2 className="mb-8 text-3xl font-bold md:mb-12 md:text-5xl">
                      {translator.global.welcome}
                    </h2>
                    <UserProfileForm />
                    <p className="text-sm text-[#636262]">
                      {translator.global.have_an_account}{' '}
                      <Link
                        to="/signin"
                        className="text-sm font-bold text-black"
                      >
                        {translator.global.login_now}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </Card>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
