
using UnityEngine;

public class InitHandler : MonoBehaviour
{
    //Reference to the prefab of the game control
    [SerializeField]
    private APIHelper apiHelperPrefab;

    void Awake()
    {
        //Check if the game control instance is null
        if (APIHelper.instance == null)
        {
            //This instance becomes the single instance available
            Instantiate(apiHelperPrefab);
        }
        //The job is done this object is not used anymore so destroy it
        Destroy(gameObject);
    }
}
