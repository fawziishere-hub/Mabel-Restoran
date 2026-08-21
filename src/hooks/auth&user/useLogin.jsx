import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "../../supabaseClient"; 

export const useLogin = () => {
  const navigate = useNavigate();

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: async ({ data }) => {
      // 1. Authenticate with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (authError) throw new Error(authError.message);

      // 2. Fetch the user's profile to get their specific role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error("Profile fetch error:", profileError);
      }

      // 3. Merge profile data (like role and name) into the user object
      const userWithRole = { 
        ...authData.user, 
        role: profile?.role || 'customer', 
        name: profile?.full_name || profile?.name || 'Kullanıcı'
      };

      // Return the ENRICHED user
      return { session: authData.session, user: userWithRole };
    },
    
    // Notice we use "data" here now, which is exactly what mutationFn returned above!
    onSuccess: (data) => {
      // Save the enriched user data to local storage
      localStorage.setItem(
        "token",
        JSON.stringify({
          token: data.session.access_token,
          user: data.user, // This now successfully includes the role!
        })
      );
      
      localStorage.setItem(
        "tokenExpiryTime",
        JSON.stringify(Date.now() + 24 * 60 * 60 * 1000)
      );
      
      toast.success("Başarıyla giriş yapıldı!");

      // RBAC MAGIC: Route based on the successfully saved role
      if (data.user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    },
    onError: (error) => {
      toast.error(error.message === "Invalid login credentials" ? "E-posta veya şifre hatalı" : error.message);
    },
  });

  return { mutate, isLoading, isSuccess };
};

export const useGmailLogin = () => {
  const navigate = useNavigate();

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (error) throw new Error(error.message);
      return data;
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred, please try again");
    },
  });

  return { mutate, isLoading, isSuccess };
};
